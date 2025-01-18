interface titleProps{
  title: string
};


const PageTitle = ({ title }:titleProps) => {
  return (
    <section className="py-10 px-0 lg:px-10" data-aos="fade-up">
      <div className="sm:container">
        <div className="border-l-[5px] border-primary pl-5">
          <h1 className="lg:text-4xl text-2xl font-bold text-gray-800 uppercase">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export { PageTitle };
