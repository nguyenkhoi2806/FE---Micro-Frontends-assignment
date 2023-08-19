PROJECT_PATH=$(pwd)

cd $PROJECT_PATH/APIs-demo/BlogService
yarn 
yarn docker:start


cd $PROJECT_PATH/APIs-demo/CheckoutService
yarn 
yarn docker:start

cd $PROJECT_PATH/APIs-demo/ProductService
yarn 
yarn docker:start

