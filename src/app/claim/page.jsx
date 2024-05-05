import Input from "@/components/Input/Input";
import Radio from "@/components/Radio/Radio";

const PropertyInsurance = () => {
  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-bold">File A Claim</h2>
      </div>
      <div className="max-w-5xl my-5">
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="w-96">
              <div className="pt-3">
                {/*<h3 className="font-semibold text-lg">*/}
                {/*    Policy ID*/}
                {/*</h3>*/}
                <Input
                  name="Policy ID"
                  placeholder="Enter Policy ID"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl my-5">
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="w-96">
              <div className="pt-3">
                {/*<h3 className="font-semibold text-lg">*/}
                {/*    Claim ID*/}
                {/*</h3>*/}
                <Input
                  name="Claim ID"
                  placeholder="Enter Claim ID"
                  type="number"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl my-5 flex flex-col">
        <label htmlFor="description">Claim Details</label>
        <textarea
          name="Claim Details"
          id="1"
          cols="30"
          rows="6"
          placeholder="Claim Details "
          className="w-full rounded-xl border border-[#D9D9D9] p-4"
          //   onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default PropertyInsurance;
