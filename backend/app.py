import tensorflow as tf
from transformers import AutoTokenizer,TFAutoModelForSequenceClassification
from flask import Flask,jsonify,request
from flask_cors import CORS
from sklearn.neighbors import NearestNeighbors
import torch
from transformers import BertModel, BertTokenizer
import pandas as pd
import numpy as np
app=Flask(__name__)

CORS(app)

original_dataset=pd.read_csv('C:/Users/jogee/Desktop/P. Jogeeswara V. N. S/Tru NLP 018 Two Stage Job Title Identification System for Online Job Advertisements/JobTitleApp/frontend/Dataset/JobsDataset.csv')
tokenizer_path = "C:/Users/jogee/Desktop/P. Jogeeswara V. N. S/Tru NLP 018 Two Stage Job Title Identification System for Online Job Advertisements/JobTitleApp/frontend/bertmodel/model"
model_path = "C:/Users/jogee/Desktop/P. Jogeeswara V. N. S/Tru NLP 018 Two Stage Job Title Identification System for Online Job Advertisements/JobTitleApp/frontend/bertmodel/model"

tokenizer = AutoTokenizer.from_pretrained(tokenizer_path, max_length=512, truncation=True)
model = TFAutoModelForSequenceClassification.from_pretrained(model_path)



bert_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained('bert-base-uncased')



def sentence_to_bert_embeddings(sentence):
    inputs = bert_tokenizer(sentence, return_tensors='pt', max_length=512, truncation=True, padding=True)
    with torch.no_grad():
        outputs = bert_model(**inputs)
        embeddings = outputs.last_hidden_state
        sentence_embedding = torch.mean(embeddings, dim=1)
    return sentence_embedding




def get_job_title(JobSector,JobDescription):
    directory_path = f'C:/Users/jogee/Desktop/P. Jogeeswara V. N. S/Tru NLP 018 Two Stage Job Title Identification System for Online Job Advertisements/JobTitleApp/frontend/bertvectors/Jobs/{JobSector}'
    job_titles=np.load(f'{directory_path}/job_titles.npy')
    job_titles_embeddings=np.load(f'{directory_path}/job_titles_embeddings.npy')
    input_embedding = sentence_to_bert_embeddings(JobDescription)
    input_embedding_np = input_embedding.numpy().reshape(1, -1)
    k = 1
    knn = NearestNeighbors(n_neighbors=k, metric='cosine')
    knn.fit(job_titles_embeddings)
    distances, indices = knn.kneighbors(input_embedding_np)
    print(distances, indices)

    nearest_job_title = job_titles[indices[0][0]]
    similarity_score = 1 - distances[0][0]

    print(f"Most Similar Job Title: {nearest_job_title}")
    print(f"Highest Similarity Score: {similarity_score}")

    return nearest_job_title.title()


@app.route('/predict',methods=['POST'])    
def predict_title():
    JobDescription=request.json['JobDescription']
    inputs = tokenizer(JobDescription, max_length=512, truncation=True, return_tensors="tf")
    logits = model(**inputs).logits
    predicted_class_id = int(tf.math.argmax(logits, axis=-1)[0])
    JobSector=model.config.id2label[predicted_class_id]
    JobTitle=get_job_title(JobSector,JobDescription)
    d={}
    d['JobSector']=JobSector
    d['JobTitle']=JobTitle
    print(d)
    return jsonify(d)


@app.route('/originaldataset',methods=['GET'])
def get_original_dataset():
    d=original_dataset['Query'].value_counts()
    r={'category':d.index.tolist(),'valueCounts':d.values.tolist()}
    return jsonify(r)

if __name__=='__main__':
    app.run(debug = True)