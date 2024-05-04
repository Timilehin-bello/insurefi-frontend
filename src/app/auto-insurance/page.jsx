import AutomobileApplication from "@/components/AutomobileApplication/AutomobileApplication";
import Input from "@/components/Input/Input";
import Radio from "@/components/Radio/Radio";
import Stepper from "@/components/Stepper/Stepper";

const AutoInsurance = () => {
  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-medium">
          Automobile Insurance Application
        </h2>
      </div>
      <div className="max-w-6xl my-5">
        <Stepper>
          <AutomobileApplication />
        </Stepper>
      </div>
    </div>
  );
};

export default AutoInsurance;
