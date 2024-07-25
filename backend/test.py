# !pip install torch
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
import torch
from transformers import BertModel, BertTokenizer

# Load BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Function to convert a sentence to BERT embeddings
def sentence_to_bert_embeddings(sentence):
    inputs = tokenizer(sentence, return_tensors='pt', max_length=512, truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state
        sentence_embedding = torch.mean(embeddings, dim=1)
    return sentence_embedding

print('OK')