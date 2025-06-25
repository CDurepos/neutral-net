from transformers import Trainer, TrainingArguments, BertTokenizer, BertForSequenceClassification
from datasets import Dataset
import pandas as pd
import numpy as np
import evaluate

DATA_PATH = '../../mbic_dataset.xlsx'
MODEL_NAME = 'google-bert/bert-base-cased'

model = BertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)

# PREPROCESSING
try:
    df = pd.read_excel(DATA_PATH)
except Exception as e:
    print("Missing MBIC dataset")
    exit()

df = df[['text', 'label']].dropna()

label_map = {'Non-biased': 0, 'Biased': 1}
df['label'] = df['label'].map(label_map)

dataset = Dataset.from_pandas(df)

def tokenize_function(examples):
    return tokenizer(examples['text'], padding='max_length', truncation=True)

tokenized_dataset = dataset.map(tokenize_function, batched=True)

split = tokenized_dataset.train_test_split(test_size=0.2)
train_dataset = split["train"]
test_dataset = split["test"]

training_args = TrainingArguments(output_dir="../../test_trainer",
                                  eval_strategy="epoch",
                                  save_strategy="epoch")

metric = evaluate.load("accuracy")
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)

# TRAINING
trainer = Trainer(
    model=model,
    args=training_args,
    compute_metrics=compute_metrics,
    train_dataset=train_dataset,
    eval_dataset=test_dataset
)

trainer.train()

# SAVING
model.save_pretrained("./binary_bias_bert")
tokenizer.save_pretrained("./binary_bias_bert")

