import Image from "next/image";

export const About = () => {
  return (
    <section className="py-24 overflow-hidden" id="about">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
            <div className="mx-auto md:ml-0 max-w-max ">
              <Image src={"/stock.png"} alt="image" width={456} height={456} />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <p className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-gray-900 font-medium uppercase rounded-full shadow-sm">
              About
            </p>
            <h2 className="mb-12 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
              Student loans are complicated
            </h2>
            <div className="flex flex-wrap -mx-4 text-center md:text-left">
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="mb-2 text-xl font-bold">Loan Types</h3>
                <p className="font-medium text-coolGray-500">
                  Your loan type depends on when you started your course. Each
                  loan type has different repayment rules, and interest rates.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="mb-2 text-xl font-bold">
                  Will it be written off?
                </h3>
                <p className="font-medium text-coolGray-500">
                  Potentially, but it depends on your loan type, yearly salary
                  and when you started your course.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="mb-2 text-xl font-bold">Should I overpay?</h3>
                <p className="font-medium text-coolGray-500">
                  This heavily depends on your yearly salary, and loan type.
                  Please use our{" "}
                  <a className="font-extrabold" href="#hero">
                    calculator
                  </a>{" "}
                  to see if it is worth overpaying.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-4 mb-8">
                <h3 className="mb-2 text-xl font-bold">
                  What do I pay per month?
                </h3>
                <p className="font-medium text-coolGray-500">
                  This depends on your loan type and salary, please use our{" "}
                  <a className="font-extrabold" href="#hero">
                    calculator
                  </a>{" "}
                  to find out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
