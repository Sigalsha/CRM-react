import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import "../../styles/clients/clientsPagination.css";

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

    return (
      <div className="clients-pagination-wrapper">
        <span
          className={`page-arrow
            ${currentPage === 1 ? "page-cursor-not-allowed" : "page-cursor"}
          `}
          onClick={() =>
            this.previousDisplay(current > 1 ? current - 1 : current)
          }
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
        <span
          onClick={() =>
            this.nextDisplay(current < pageCount ? current + 1 : current)
          }
          className={`page-arrow
            ${
              currentPage === pageCount
                ? "page-cursor-not-allowed"
                : "page-cursor"
            }
          `}
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
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageCount); i++) {
    pageNumbers.push(i);
  }

  function handlePageClick(e) {
    handleSinglePageClick(Number(e.target.id));
  }

  return (
    <ul className="page-numbers">
      {pageNumbers.map((num) => {
        return (
          <li
            key={num}
            id={num}
            className={`page-number
              ${
                Math.ceil(pageLimit / 20) === num
                  ? "current-page-number"
                  : "not-current-page"
              }
              ${
                num > Math.ceil(pageLimit / 20) + 10 ||
                num < Math.ceil(pageLimit / 20) - 10
                  ? "page-not-in-range"
                  : ""
              }
            `}
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
