import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.externals import joblib
from sklearn import tree

df=pd.read_csv('music.csv')

df.shape() 
df.head()
df.describe()
df.values() #as array 
x=df.drop(columns='genre')
y=df['genre']
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2)
model=DecisionTreeClassifier()
model.fit(x_train,y_train)
predictions=model.predict(x_test)
score=accuracy_score(y_test,predictions)
joblib.dump(model,'music-recommender.joblib')

#to visualise decision tree
tree.export_graphviz(model,out_file='music-recommender.dot',feature_names=['age','gender'],class_names=sorted(y.unique()),label='all',rounded=True,filled=True)

score