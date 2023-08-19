PROJECT_PATH=$(pwd)


cd $PROJECT_PATH/APIs-demo/BlogService
yarn data:restore


cd $PROJECT_PATH/APIs-demo/CheckoutService
yarn data:restore


cd $PROJECT_PATH/APIs-demo/ProductService
yarn data:restore