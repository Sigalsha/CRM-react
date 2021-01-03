import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

class ClientsPagination extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.isPageReset &&
      this.props.isPageReset !== prevProps.isPageReset
    ) {
      this.setState({ currentPage: 1 });
    }
  }

  previousDisplay = (pageNum) => {
    this.props.updateDisplayByPage(-1, pageNum);
    this.setState({ currentPage: pageNum });
  };
  nextDisplay = (pageNum) => {
    this.props.updateDisplayByPage(1, pageNum);
    this.setState({ currentPage: pageNum });
  };

  handleSinglePageClick = (number) => {
    const { currentPage } = this.state;
    if (currentPage > number) {
      this.previousDisplay(number);
    } else if (currentPage < number) {
      this.nextDisplay(number);
    }
  };

  render() {
    const { currentPage } = this.state;
    const { pageCount } = this.props;
    let current = currentPage;
    console.log("current: ", current);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <span
          onClick={() =>
            this.previousDisplay(current > 1 ? current - 1 : current)
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowCircleLeft}
            style={{ marginRight: 5 }}
          />
          previous
        </span>
        <PageNumbers
          pageCount={this.props.pageCount}
          pageLimit={this.props.pageLimit}
          handleSinglePageClick={this.handleSinglePageClick}
        />

        {/*      <div>
          <span>
            {" "}
            {this.props.pageLimit - 20} - {this.props.pageLimit}{" "}
          </span>
        </div> */}

        <span
          onClick={() =>
            this.nextDisplay(current < pageCount ? current + 1 : current)
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor: currentPage === pageCount ? "not-allowed" : "pointer",
          }}
        >
          next
          <FontAwesomeIcon
            icon={faArrowCircleRight}
            style={{ marginLeft: 5 }}
          />
        </span>
      </div>
    );
  }
}

const PageNumbers = ({ pageCount, handleSinglePageClick, pageLimit }) => {
  console.log("pageNumbers, pageCount: ", pageCount);
  console.log("pageNumbers, pageLimit: ", pageLimit);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageCount); i++) {
    pageNumbers.push(i);
  }

  function handlePageClick(e) {
    handleSinglePageClick(Number(e.target.id));
  }

  return (
    <ul
      style={{
        display: "flex",
        listStyleType: "none",
        justifyContent: "space-evenly",
        margin: "5px",
      }}
    >
      {pageNumbers.map((num) => {
        return (
          <li
            key={num}
            id={num}
            style={{
              paddingRight: "5px",
              color: Math.ceil(pageLimit / 20) === num ? "blue" : "black",
              cursor: "pointer",
            }}
            onClick={handlePageClick}
          >
            {num}
          </li>
        );
      })}
    </ul>
  );
};

export default ClientsPagination;
