export default function Requirements() {
    const requirements = [
      "Basic understanding of Python programming",
      "Familiarity with linear algebra and calculus concepts",
      "Basic knowledge of statistics and probability",
      "A computer capable of running Python and machine learning libraries",
    ];
  
    return (
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Requirements</h2>
        <ul className="ml-6 list-disc space-y-2">
          {requirements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }