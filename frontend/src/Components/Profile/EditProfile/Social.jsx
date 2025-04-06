/* eslint-disable react/prop-types */
const Social = ({ gitHub, setGitHub, linkedin, setLinkedin }) => {
  return (
    <fieldset className="fieldset w-[100%] mx-auto my-8  space-y-4  p-4 rounded-box">
      <div>
        <label className="block text-base">GitHub Username</label>
        <input
          type="text"
          name="gitHub"
          value={gitHub}
          onChange={(e) => setGitHub(e.target.value)}
          className="input w-full bg-base-200/50"
        />
      </div>
      <div>
        <label className="block text-base">LinkedIn Url</label>
        <input
          type="text"
          name="linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className="input w-full bg-base-200/50"
        />
      </div>
    </fieldset>
  );
};

export default Social;
