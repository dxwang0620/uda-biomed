export default function Research() {
  return (
    <div className="container">
      <section aria-labelledby="research-heading">
        <p>OUR RESEARCH</p>
        <h1 id="research-heading">Researching Disease at Its Foundations</h1>
        <p>
          Connecting molecular investigation, analytical methods and
          collaborative research.
        </p>
      </section>

      <section aria-labelledby="focus-heading">
        <h2 id="focus-heading">Research Focus</h2>
        <ul role="list">
          <li>
            <h3>Molecular Insights</h3>
            <p>
              Investigating molecular changes that may contribute to disease.
            </p>
          </li>
          <li>
            <h3>Cancer Detection Research</h3>
            <p>
              Exploring analytical approaches for earlier and more precise
              detection.
            </p>
          </li>
          <li>
            <h3>Clinical Collaboration</h3>
            <p>
              Working with research and clinical partners to translate
              scientific questions.
            </p>
          </li>
        </ul>
      </section>

      <section>
        {/* 絕對不要在這裡編造內容。見 CLAUDE.md 工作方式第 3 條。 */}
        <p>[TODO: 發表 —— 需要真實的論文清單，不編造]</p>
        <p>[TODO: 臨床進展 —— 需要你確認可公開的階段敘述，不編造試驗期別]</p>
      </section>
    </div>
  )
}
