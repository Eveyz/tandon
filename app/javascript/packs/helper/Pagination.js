import React from 'react';

class Pagination extends React.Component {
  render() {
    let pages = [];
    pages.push(<li key={"first"}><a href="#!" onClick = {(e) => {e.preventDefault();this.props.updateCurrentPage(-1)}}><i className="material-icons">chevron_left</i></a></li>);
    for (var i = 1; i <= this.props.pages; i++) {
      let counter = i;
      (this.props.currentPage === counter) ? 
      pages.push(<li key={i} className="active" ><a href="#!" onClick={(e) => {e.preventDefault();this.props.goToPage(counter)}}>{i}</a></li>) 
      : 
      pages.push(<li key={i}><a href="#!" onClick={(e) => {e.preventDefault();this.props.goToPage(counter)}}>{i}</a></li>);
    }
    pages.push(<li key={"last"}><a href="#!" onClick={(e) => {e.preventDefault();this.props.updateCurrentPage(1)}}><i className = "material-icons">chevron_right</i></a></li>);

    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <center>
                <ul className="pagination"> 
                  {pages}
                </ul>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Pagination