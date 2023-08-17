import { mountRemoteComponent } from "@/utils/loadComponent";
import { useNavigate, useSearchParams } from "react-router-dom";

const Shop = ({ eventBus }: any) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return mountRemoteComponent({
    module: "product",
    component: "ProductView",
    props: {
      navigate,
      searchParams: {
        categoryId: Number(searchParams.get("category")),
      },
      eventBus,
    },
  });
};

export default Shop;
