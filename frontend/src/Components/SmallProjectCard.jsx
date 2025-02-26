const SmallProjectCard = ({ projects }) => {
  {
    return projects.map((project, index) => {
      <div key={index}>
        <p>{project.PName}</p>
        <p>Skills</p>
      </div>;
    });
  }
};

export default SmallProjectCard;
