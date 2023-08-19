PROJECT_PATH=$(pwd)

cd $PROJECT_PATH/APIs-demo/BlogService
yarn 
yarn docker:stop


cd $PROJECT_PATH/APIs-demo/CheckoutService
yarn 
yarn docker:stop

cd $PROJECT_PATH/APIs-demo/ProductService
yarn 
yarn docker:stop

