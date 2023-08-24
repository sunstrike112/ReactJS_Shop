import styled from 'styled-components'

export const Wrapper = styled.aside`
  background-color: #05050b;
  backdrop-filter: blur(0.5rem);
  will-change: backdrop-filter;
  inset: 0;
  margin: .5rem .75rem;
  flex-direction: column;
  border-right: 0 solid #05050b;
  border-radius: 1rem;
  box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
  transition: all .2s ease-in-out;
  height: 100vh;
	position: relative;
  .aside-foot {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .aside-head {
    padding: .75rem;
    .brand {
      display: flex;
      height: 4rem;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .brand-logo {
        display: flex;
        align-items: center;
        .brand-title {
          font-size: .5rem;
          margin: 0;
          background-color: transparent;
          color: #fff;
          font-weight: 900;
          img {
            filter: ${({ companyLogo }) => (companyLogo ? 'unset' : 'brightness(10)')};
            width: 120px;
            height: 60px;
            object-fit: contain;
            cursor: pointer;
            object-fit: contain;
          }
        }
      }
      .brand-aside-toggle {
        cursor: pointer;
        font-size: 1.75rem;
        background-color: transparent;
        border: none;
        padding: 0.375rem;
        border-radius: 2rem;
        line-height: 0;
        .svg-icon--material {
          fill: currentColor;
        }
      }
    }
  }

  .aside-body {
    padding: 0;
    display: flex;
    overflow: auto;
    height: 100%;
    flex-direction: column;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: transparent;
    }

    &:hover {
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: #838383;
      }
    }
    .navigation-line {
      margin: 0.75rem 0;
      border-bottom: 1px solid #fff;
      opacity: .15;
    }
  }

  .aside-foot {
    .user {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #19191f;
      color: #e7eef8;
      cursor: pointer;
      transition: all .2s ease-in-out;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;

      &:hover {
        background: #2d2d32;
      }

      .user-avatar {
        margin-right: .75rem;
        img {
          background-color: #e9e7f8;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 2.5rem;
          box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
          object-fit: cover;
        }
      }

      .user-info {
        .user-name {
          font-size: .7rem;
          font-weight: 500;
          word-break: break-word;
        }
        .user-sub-title {
          font-size: .7rem;
          color: #6c757d;
          font-weight: 400;
        }
      }
      .company-info {
        font-size: .9rem;
        font-weight: 700;
      }
    }
  }
`

export const Ul = styled.ul`
  padding: 0;
  margin-bottom: 0;

  .navigation {
    .navigation-item {
      padding: 0.375rem 0 0 0.75rem;
    }
  }
`

export const Li = styled.li`
  list-style: none;
  cursor: pointer;
  display: list-item;
  transition: opacity 0.2s;
  color: ${({ theme }) => theme.white};
  padding: .2rem .75rem;
  transition: all .2s ease-in-out;

  .navigation-title {
    padding: 0 0.75rem;
    display: block;
    color: rgba(231,238,248,.6);
    font-size: .8rem;
    font-weight: 600;
    line-height: 1rem;
  }

  a.navigation-link {
    position: relative;
    color: ${({ theme, disabled }) => (disabled ? theme.text_disabled : theme.text_hight_light)};
    padding: .75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: .7rem;
    width: 100%;
    margin: 0 auto;
    &:hover {
      color: ${({ theme }) => theme.black};
      background-color: ${({ theme }) => theme.white};
      border-radius: 1rem;
      width: 100%;
      margin: 0 auto;
    }

    .navigation-link-info {
      display: flex;
      align-items: center;

      .navigation-icon {
        margin-right: .75rem;
        width: calc(1rem + .3vw);
        font-size: 1.1rem;
      }
    }

    .navigation-link-extra {
      font-size: 1rem;
      display: flex;
      align-items: center;

      .svg-icon--material {
        fill: currentColor;
        position: unset;
        right: unset;

        &.down {
          transform: rotate(90deg);
        }
      }
    }

    &.active {
      color: ${({ theme }) => theme.black};
      background-color: ${({ theme }) => theme.white};
      border-radius: 1rem;
      .navigation-icon {
        stroke: ${({ stroke }) => stroke};
        fill: ${({ fill }) => fill};
        &:hover {
          stroke: ${({ theme }) => theme.white};
          fill: ${({ theme }) => theme.black};
        }
      }
    }

    &:hover {
      color: ${({ theme, disabled }) => (disabled ? theme.text_disabled : theme.black)};
      background-color: ${({ theme, disabled }) => (disabled ? theme.black : theme.white)};
      border-radius: 1rem;
      width: 100%;
      margin: 0 auto;

      .navigation-icon {
        color: ${({ theme, disabled }) => (disabled ? theme.text_disabled : theme.black)};
        background-color: ${({ theme, disabled }) => (disabled ? theme.black : theme.white)};
        stroke: ${({ theme }) => theme.white};
        fill: ${({ theme }) => theme.black};
      }
    }
  }
`
