/* eslint-disable react/prop-types */
const Social = ({ gitHub, setGitHub }) => {
  return (
    <fieldset className="fieldset w-xl mx-auto bg-base-200 space-y-4 border border-base-300 p-4 rounded-box">
      <div>
        <label className="block text-base">GitHub Username</label>
        <input
          type="text"
          name="gitHub"
          value={gitHub}
          onChange={(e) => setGitHub(e.target.value)}
          className="input dark:bg-stone-500 text-white input-bordered w-full bg-white"
        />
      </div>
      <div>
        <label className="block text-base">LinkedIn Url</label>
        <input
          type="text"
          name="linkedin"
          value={gitHub}
          onChange={(e) => setGitHub(e.target.value)}
          className="input dark:bg-stone-500 text-white input-bordered w-full bg-white"
        />
      </div>
    </fieldset>
  );
};

export default Social;
