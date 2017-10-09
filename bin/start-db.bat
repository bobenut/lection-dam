if not exist "./db/mongo/data" (
  md "./db/mongo/data"
)

cd ./db/mongo/data
del /Q /F mongod.lock
cd ..
C:\kxh\db\mongodb-win32-i386-2.4.6\bin\mongod -f mongodb.cnf