/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.footer`
  margin: 0 1rem .5rem;
  border-radius: 1rem;
  box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
  padding: .25rem 0.75rem;
  position: sticky;
  z-index: 998;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #f8f9fa;
  background-color: ${({ theme }) => theme.bg_light_transparent};
  backdrop-filter: blur(0.5rem);
  will-change: backdrop-filter;
  color: #323232;
  .container {
    width: 100%;
    .row {
      display: flex;
      flex-wrap: wrap;
      .col {
        flex: 1 0;
        .copyright {
          font-weight: 300;
          font-size: .75rem;
        }
      }
      .col-auto {
        flex: 0 0 auto;
        width: auto;
      }
    }
  }
`

const Footer = () => (
  <Wrapper>
    <div className="container">
      <div className="row">
        <div className="col">
          <span className="fw-light copyright">Copyright © 2021 - Version 2.0.1</span>
        </div>
        <div className="col-auto">
          <a href="/" className="text-decoration-none link-dark">
            <small className="fw-bold">9h Theme</small>
          </a>
        </div>
      </div>
    </div>
  </Wrapper>
)

export default Footer
