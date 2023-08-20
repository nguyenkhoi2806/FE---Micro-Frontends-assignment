import { mountRemoteComponent } from "@/utils/loadComponent";
import { useNavigate } from "react-router-dom";

const WishList = ({ eventBus }: any) => {
  const navigate = useNavigate();

  return mountRemoteComponent({
    module: "product",
    component: "ProductWishList",
    props: {
      navigate,
      eventBus,
    },
  });
};

export default WishList;
