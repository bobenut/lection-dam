if not exist "./db/mongo/data" (
  md "./db/mongo/data"
)

cd ./db/mongo/data
del /Q /F mongod.lock
cd ..
mongod -f mongodb.cnf