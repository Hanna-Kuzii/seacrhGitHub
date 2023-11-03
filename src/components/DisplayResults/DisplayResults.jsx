export const DisplayResults = ({ results }) => {
  return (
    <div className="results">
      <table className="table results__table">
        <thead className="results__head">
          <tr className="results__row">
            <th scope="col" className="results__column">
              #
            </th>
            <th scope="col" className="results__column">
              Name of repository
            </th>
            <th scope="col" className="results__column">
              Description
            </th>
            <th scope="col" className="results__column">
              Author
            </th>
          </tr>
        </thead>
        <tbody className="results__body">
          {results.map((item, index) => (
            <tr key={item.id} className="results__item">
              <th scope="row">{index + 1}</th>
              <td className="results__name">
                <a href={item.html_url} target="_blank">
                  {item.name}
                </a>
              </td>
              <td>{item.description}</td>
              <td>{item.owner.login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
