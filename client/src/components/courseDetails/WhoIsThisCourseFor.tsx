export function WhoThisCourseIsFor() {
    const targetAudience = [
      "Data scientists looking to deepen their machine learning expertise",
      "Software engineers interested in specializing in AI and ML",
      "Researchers who want to apply machine learning to their domain",
      "Students pursuing advanced degrees in computer science or related fields",
      "Professionals looking to transition into machine learning roles",
    ];
  
    return (
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Who This Course Is For</h2>
        <ul className="ml-6 list-disc space-y-2">
          {targetAudience.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }