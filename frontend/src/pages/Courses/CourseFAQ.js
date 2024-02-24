const CourseFAQ = () => {
  return (
    <>
      <section>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Will I actually get 90% of my course fee back?
          </div>
          <div className="collapse-content">
            <p>
              To qualify for the refund,you must complete 90% of the course
              content within 90 days from the date of purchase
            </p>

            <p>Content you have to cover in each section:</p>

            <p>
              Chapter Section: 90% including Videos, Articles, Problems and Quiz
              Live Section: 90% attendance in Industry Expert Sessions
              throughout the course duration{" "}
            </p>

            <p>(watching recordings of live sessions will not count)</p>
            <p>Contest Section: 90% of the contests must be solved</p>
            <p>For detailed information click here.</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            How can I enroll for this program?
          </div>
          <div className="collapse-content">
            <p>
              You need to fill out an Application form post initial
              registration. After that, your application will be reviewed by our
              team to assess your eligibility for this program.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Once I am enrolled in the program, for how long will the course
            content be available for?
          </div>
          <div className="collapse-content">
            <p>
              The course content will be available for a period of 1 year from
              the date of purchase.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            What if I am not selected?
          </div>
          <div className="collapse-content">
            <p>
              You will be able to re-apply to the program based on your
              eligibility criteria.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseFAQ;
