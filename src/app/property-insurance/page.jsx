import Input from "@/components/Input/Input";
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
          <div className="w-full">
            <div className="flex justify-between w-full">
              <div className="w-96">
                <div className="pt-3">
                  <h3 className="font-semibold text-lg">
                    Personal Information
                  </h3>
                  <Input name="Name" placeholder="Full Name" type="text" />
                </div>
                {/* <div className="pt-4">
                  <h3 className="font-semibold text-lg">Driving History</h3>
                  <div className="flex gap-4">
                    <Input name="Accidents" placeholder="0" type="number" />
                    <Input name="Violations" placeholder="0" type="number" />
                  </div>
                </div> */}
              </div>
              <div className="pt-4">
                <div>
                  <div className="flex gap-4">
                    <h3 className="font-semibold text-lg">Property Location</h3>
                    <h3 className="font-semibold text-lg">Property Location</h3>
                  </div>
                  <div className="flex justify-between">
                    <Radio options={["Urban", "Suburban", "Rural"]} />
                    <Radio
                      options={["Residential", "Commercial", "Industrial"]}
                    />
                  </div>
                  {/* <div className="flex gap-6 pl-4">
                    <Input name="Car Age" placeholder="0" type="number" />
                    <Input name="Millage" placeholder="0" type="number" />
                  </div>
                  <div className="flex  gap-6 pl-4">
                    <Input name="Plate No." placeholder="0" type="number" />
                    <Input name="Value($)" placeholder="0" type="number" />
                  </div> */}
                </div>
                <div></div>
              </div>
            </div>
            <div></div>
          </div>
        </Stepper>
      </div>
    </div>
  );
};

export default PropertyInsurance;
