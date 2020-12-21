import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

class ClientsPagination extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
    };
  }
  previousDisplay = (pageNum) => this.props.updateDisplayByPage(-1, pageNum);
  nextDisplay = (pageNum) => this.props.updateDisplayByPage(1, pageNum);

  handleSinglePageClick = (number) => {
    const { currentPage } = this.state;
    if (currentPage > number) {
      this.previousDisplay(number);
    } else if (currentPage < number) {
      this.nextDisplay(number);
    }
    this.setState({
      currentPage: number,
    });
  };

  render() {
    const { currentPage } = this.state;
    console.log("currentPage: ", currentPage);
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <span
          onClick={() => this.previousDisplay(0)}
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
        {/*         <span>
          {" "}
          {this.props.pageLimit - 20} - {this.props.pageLimit}{" "}
        </span> */}
        <PageNumbers
          pageCount={this.props.pageCount}
          pageLimit={this.props.pageLimit}
          handleSinglePageClick={this.handleSinglePageClick}
        />
        <span
          onClick={() => this.nextDisplay(0)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor:
              currentPage === this.props.pageCount ? "not-allowed" : "pointer",
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
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pageCount); i++) {
    pageNumbers.push(i);
  }
  const firstTenPages = [];
  for (let i = 1; i < 11; i++) {
    firstTenPages.push(i);
  }

  function handlePageClick(e) {
    e.preventDefault();
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
              color: pageLimit / 20 === num ? "blue" : "black",
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
