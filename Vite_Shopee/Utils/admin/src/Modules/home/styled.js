import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 39px);
  padding: 0 1rem;
	position: relative;

	.popover {
		position: absolute;
		top: 25%;
		left: 2%;
	}

  .container {
    width: 100%;
    z-index: 200;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    text-align: center;
    flex-wrap: wrap;
    &__content {
      width: 50%;
      &--img {
        max-height: 400px;
      }

      &--title {
        font-size: calc(1.5rem + 4.5vw);
        font-weight: 300;
        img {
          width: 250px;
        }
      }
      &--company {
        font-size: calc(1.375rem + 2.5vw);
        font-weight: 300;
        line-height: 1.2;
      }
      .display-6 {
        font-size: calc(1.375rem + 1.5vw);
        font-weight: 300;
        line-height: 1.2;
      }
      .h2 {
        font-size: calc(1.325rem + .9vw);
        .text-info {
          color: #4e68f9;
        }
      }
    }
  }
  .animation-0-2-9 {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 0;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: absolute;
    align-items: flex-start;
    justify-content: center;

    .item-0-2-10 {
      position: relative;
      will-change: transform;
      background-size: contain;
      transform-style: preserve-3d;
      background-repeat: no-repeat;
      background-position: center;

      &.item1-0-2-11 {
        top: 10%;
        width: 20px;
        height: 20px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item.738e6395.webp');
      }
      &.item2-0-2-12 {
        top: 15%;
        width: 55px;
        height: 55px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item2.2194131f.webp');
      }
      &.item3-0-2-13 {
        top: 37%;
        left: -30%;
        width: 45px;
        height: 45px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item3.dba854cb.webp');
      }
      &.item4-0-2-14 {
        margin: auto 10px;
        width: 15px;
        height: 15px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item4.f9fd7783.webp');
      }
      &.item5-0-2-15 {
        top: 78%;
        left: auto;
        right: 24%;
        bottom: auto;
        width: 12px;
        height: 12px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item5.0b49b0b7.webp');
      }
      &.item6-0-2-16 {
        top: 53%;
        left: auto;
        right: 20%;
        bottom: auto;
        width: 10px;
        height: 10px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item6.02f327fd.webp');
      }
      &.item7-0-2-17 {
        top: 60%;
        left: 0%;
        right: 0%;
        bottom: auto;
        width: 25px;
        height: 25px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item7.eebc77f9.webp');
      }
      &.item8-0-2-18 {
        position: absolute;
        top: auto;
        right: 8%;
        bottom: 14%;
        width: 44px;
        height: 44px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item8.d0eacb0d.webp');
      }
      &.item9-0-2-19 {
        top: 32%;
        left: 16%;
        bottom: auto;
        width: 10px;
        height: 10px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item9.72183225.webp');
      }
      &.item10-0-2-20 {
        top: 32%;
        right: -35%;
        width: 32px;
        height: 32px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item10.5dc65e04.webp');
      }
      &.item11-0-2-21 {
        top: 71%;
        left: 38%;
        right: auto;
        bottom: auto;
        width: 20px;
        height: 20px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item11.fc6712ed.webp');
      }
      &.item12-0-2-22 {
        top: 73%;
        left: -44%;
        right: auto;
        bottom: auto;
        width: 18px;
        height: 18px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item12.2b2e237c.webp');
      }
      &.item13-0-2-23 {
        top: 56%;
        left: 30%;
        right: auto;
        bottom: auto;
        width: 12px;
        height: 12px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item13.16ba27e4.webp');
      }
      &.item14-0-2-24 {
        top: 93%;
        left: 0%;
        right: -22%;
        bottom: auto;
        width: 18px;
        height: 18px;
        background-image: url('https://facit-modern.omtankestudio.com/static/media/item14.e616e651.webp');
      }
    }
  }
`

export const PopoverWrapper = styled.div`
	max-width: 300px;
`
