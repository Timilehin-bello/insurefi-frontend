import DropZone from "@/components/DropZone/DropZone";
import Input from "@/components/Input/Input";
import PropertyApplication from "@/components/PropertyApplication/PropertyApplication";
import Radio from "@/components/Radio/Radio";
import Stepper from "@/components/Stepper/Stepper";

const PropertyInsurance = () => {
  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-medium">
          Property Insurance Application
        </h2>
      </div>
      <div className="max-w-5xl my-5">
        <Stepper>
          <PropertyApplication />
        </Stepper>
      </div>
    </div>
  );
};

export default PropertyInsurance;
