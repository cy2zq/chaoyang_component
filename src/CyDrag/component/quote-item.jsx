// @cy
import styled from '@emotion/styled';
import { Badge, Progress, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { borderRadius, grid, hoverColor } from './constants';

const { Paragraph } = Typography;

const getBackgroundColor = (isDragging, isGroupedOver, authorColors) => {
  // if (isDragging) {
  //   return "yellow";
  // }
  //
  // if (isGroupedOver) {
  //   return "yellow";
  // }

  return 'white';
};

const getBorderColor = (isDragging, status, taskPriority) => {
  let color = {
    1: 'transparent',
    3: '#10CE3B',
    2: '#009CF4',
    4: '#FFA214',
    5: '#FFA214',
  };
  let color_taskPriority = {
    P0: '#F93339',
    P1: '#FFA114',
  };
  return isDragging
    ? color_taskPriority?.[taskPriority]
    : color_taskPriority?.[taskPriority] || 'transparent';
};
const tagMap = {
  P0: (
    <Tag
      style={{
        borderRadius: 10,
        width: 39,
        textAlign: 'center',
        border: 'none',
        background: '#FFE8E8',
        color: '#F93339',
      }}
    >
      P0
    </Tag>
  ),
  P2: (
    <Tag
      style={{
        borderRadius: 10,
        width: 39,
        textAlign: 'center',
        border: 'none',
        background: '#E7F2FF',
        color: '#009CF4',
      }}
    >
      P2
    </Tag>
  ),
  P1: (
    <Tag
      // color={"#FFA114"}
      style={{
        borderRadius: 10,
        width: 39,
        textAlign: 'center',
        border: 'none',
        background: '#FFF2DE',
        color: '#FFA114',
      }}
    >
      P1
    </Tag>
  ),
  P3: (
    <Tag
      // color={"#12ce3b"}
      style={{
        borderRadius: 10,
        width: 39,
        textAlign: 'center',
        border: 'none',
        background: '#ECF8F2',
        color: '#12CE3B',
      }}
    >
      P3
    </Tag>
  ),
  P4: (
    <Tag
      // color={"#12ce3b"}
      style={{
        borderRadius: 10,
        width: 39,
        textAlign: 'center',
        border: 'none',
        background: '#F0F0F0',
        color: '#8f8f8f',
      }}
    >
      P4
    </Tag>
  ),
};
const statusMap = {
  3: <Badge status="success" text="完成" color={'#10CE3B'} />,
  2: <Badge status="processing" text="进行中" color={'#009CF4'} />,
  1: <Badge status="default" text="未开始" />,
  4: <Badge status="warning" text="暂停" color={'#FFA214'} />,
  5: <Badge status="warning" text="已归档" color={'#FFA214'} />,
};

const imageSize = 40;

const Container = styled.a`
  border-radius: ${borderRadius}px;
  background-color: ${(props) =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 3px 6px 0px rgba(0,0,0,0.2)` : 'none')};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;
  border-left: 5px solid #12ce3b;
  border-color: ${(props) =>
    getBorderColor(props.isDragging, props?.quote?.taskStatus, props?.quote?.taskPriority)};
  /* anchor overrides */
  //color: red;

  &:hover,
  &:active {
    color: ${hoverColor};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props?.colors?.hard};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const Opt = styled.div`
  cursor: pointer;
  //padding: 0 8px 0px 8px;
  padding: 0px 5px 0px 5px;
  color: #a6a6a6;
  font-size: 20px;
  border-radius: 4px;
  &:hover {
    color: #04cb8f;
    background: #eefff5;
    display: flex;
    align-items: center;
  }
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  flex-basis: 100%;

  display: flex;
  flex-direction: column;
  //height: 120px;
  position: relative;
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

function QuoteItem(props) {
  const { quote, isDragging, isGroupedOver, provided, style, isClone, index } = props;
  const [isOpen, setIsOpen] = useState(false); // 控制弹窗
  const [openData, setOpenData] = useState({}); // 控制弹窗
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const domClick = (quote) => {
    setOpenData(quote);
    setIsOpen(true);
  };

  let title = (
    <div
      style={{
        color: 'rgba(0, 0, 0, 0.88)',
        fontSize: 16,
        fontWeight: 550,
        marginTop: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItem: 'center',
        // paddingRight: 30,
        wordBreak: 'break-word',
      }}
    >
      {quote.taskTitle?.includes('1') ? quote.taskTitle : quote.taskTitle || <span></span>}
    </div>
  );
  let isTitle = quote.taskTitle?.includes('【');
  if (isTitle) {
    title = (
      <div>
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.65)',
            fontSize: 14,
            marginTop: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItem: 'center',
            // paddingRight: 30,
            wordBreak: 'break-word',
          }}
        >
          #
          {quote.taskTitle?.slice(
            quote.taskTitle?.indexOf('【') + 1,
            quote.taskTitle?.indexOf('】'),
          ) || <span></span>}
        </div>
        <div
          style={{
            color: 'rgba(0, 0, 0, 0.8)',
            fontSize: 16,
            fontWeight: 550,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItem: 'center',
            wordBreak: 'break-word',
          }}
        >
          {quote?.taskTitle?.slice(quote?.taskTitle?.indexOf('】') + 1)}
        </div>
      </div>
    );
  }
  const isWork = window.location.href?.includes('work');
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Container
        quote={quote}
        // href={quote.author.url}
        isDragging={isDragging}
        onClick={() => domClick(quote)}
        isGroupedOver={isGroupedOver}
        isClone={isClone}
        // colors={quote.author.colors}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided, style)}
        data-is-dragging={isDragging}
        data-testid={quote.id}
        data-index={index}
        // aria-label={`${quote.author.name} quote ${quote.content}`}
      >
        <Content>
          {title}
          {quote?.taskAbstract && (
            <Footer
              style={{
                margin: '4px 0 0px 0',
                fontSize: 14,
                color: 'rgba(0,0,0,.65)',
              }}
            >
              <Paragraph
                style={{ marginBottom: -8 }}
                ellipsis={{ rows: 2, expandable: false, symbol: 'more' }}
              >
                <div dangerouslySetInnerHTML={{ __html: quote?.taskAbstract }} />
              </Paragraph>
            </Footer>
          )}
          {quote?.dutyPersonName ||
          quote?.taskProgress !== null ||
          quote?.taskBeginDate ||
          quote?.taskEndDate ? (
            <Footer
              className={'cy'}
              style={{
                alignItem: 'flex-start',
                marginTop: 16,
                height: 32,
              }}
            >
              {quote?.taskProgress !== null && (
                <Progress
                  percent={quote?.taskProgress}
                  percentPosition={{ align: 'start', type: 'inner' }}
                  size={[100, 20]}
                  status="active"
                  strokeColor={'#CEFFD6'}
                  style={{ width: 100, marginTop: 4 }}
                  format={(p) => {
                    return (
                      <div
                        style={{
                          color: '#00C12A',
                          paddingLeft: 4,
                          fontSize: 12,
                          position: 'absolute',
                          zIndex: 9,
                          top: 6,
                        }}
                      >
                        {p}%
                      </div>
                    );
                  }}
                />
              )}

              {(quote?.taskBeginDate || quote?.taskEndDate) && (
                <Tag
                  style={{
                    borderRadius: 10,
                    border: 'none',
                    background: '#F5F6F7',
                  }}
                >
                  {quote?.taskBeginDate} {quote?.taskBeginDate && quote?.taskEndDate && '- '}
                  {quote?.taskEndDate}
                </Tag>
              )}
              {quote?.dutyPersonName && (
                <span
                  style={{
                    position: 'absolute',
                    right: 4,
                    color: 'rgba(0, 0, 0, 0.65)',
                    fontSize: 12,
                    lineHeight: '18px',
                    display: 'flex',
                  }}
                >
                  <svg
                    style={{ marginRight: 4, transform: 'translateY(2px)' }}
                    fill="none"
                    version="1.1"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <defs>
                      <clipPath id="master_svg0_139_6971">
                        <rect x="0" y="0" width="14" height="14" rx="0" />
                      </clipPath>
                    </defs>
                    <g clip-path="url(#master_svg0_139_6971)">
                      <g>
                        <rect
                          x="0"
                          y="0"
                          width="14"
                          height="14"
                          rx="0"
                          fill="#FFFFFF"
                          fill-opacity="0.009999999776482582"
                        />
                      </g>
                      <g>
                        <path
                          d="M9.04182609375,3.79167Q9.04182609375,3.89197,9.03199609375,3.99178Q9.02216609375,4.0916,9.00259609375,4.18998Q8.98303609375,4.288349999999999,8.95391609375,4.38433Q8.92479609375,4.480309999999999,8.88641609375,4.572979999999999Q8.84803609375,4.66564,8.80074609375,4.7541Q8.75346609375,4.842560000000001,8.69774609375,4.92596Q8.642026093750001,5.0093499999999995,8.57839609375,5.08689Q8.51476609375,5.16442,8.44383609375,5.23534Q8.37291609375,5.30627,8.29538609375,5.3698999999999995Q8.21784609375,5.43353,8.13445609375,5.48925Q8.05105609375,5.54497,7.96259609375,5.59225Q7.87413609375,5.63954,7.781476093749999,5.67792Q7.688806093749999,5.7163,7.59282609375,5.74542Q7.496846093749999,5.77454,7.39847609375,5.7941Q7.30009609375,5.81367,7.20027609375,5.8235Q7.100466093750001,5.83333,7.00016609375,5.83333Q6.89986609375,5.83333,6.80004609375,5.8235Q6.7002260937500004,5.81367,6.6018560937499995,5.7941Q6.50347609375,5.77454,6.40749609375,5.74542Q6.31151609375,5.7163,6.21884609375,5.67792Q6.12618609375,5.63954,6.03772609375,5.59225Q5.94927009375,5.54497,5.86587309375,5.48925Q5.78247609375,5.43353,5.70494309375,5.3698999999999995Q5.62740909375,5.30627,5.55648609375,5.23534Q5.48556309375,5.16442,5.42193309375,5.08689Q5.35830309375,5.0093499999999995,5.30257909375,4.92596Q5.24685509375,4.842560000000001,5.19957309375,4.7541Q5.15229209375,4.66564,5.11390909375,4.572979999999999Q5.07552509375,4.480309999999999,5.04640959375,4.38433Q5.01729379375,4.288349999999999,4.99772609375,4.18998Q4.97815849375,4.0916,4.96832727375,3.99178Q4.95849609375,3.89197,4.95849609375,3.79167Q4.95849609375,3.69137,4.96832727375,3.59155Q4.97815849375,3.49173,4.99772609375,3.39336Q5.01729379375,3.29498,5.04640959375,3.199Q5.07552509375,3.10302,5.11390909375,3.01035Q5.15229209375,2.91769,5.19957309375,2.82923Q5.24685509375,2.740774,5.30257909375,2.657377Q5.35830309375,2.57398,5.42193309375,2.496447Q5.48556309375,2.418913,5.55648609375,2.3479900000000002Q5.62740909375,2.2770669999999997,5.70494309375,2.213437Q5.78247609375,2.149807,5.86587309375,2.094083Q5.94927009375,2.038359,6.03772609375,1.991077Q6.12618609375,1.943796,6.21884609375,1.905413Q6.31151609375,1.867029,6.40749609375,1.8379135Q6.50347609375,1.8087977,6.6018560937499995,1.78923Q6.7002260937500004,1.7696624,6.80004609375,1.75983118Q6.89986609375,1.75,7.00016609375,1.75Q7.100466093750001,1.75,7.20027609375,1.75983118Q7.30009609375,1.7696624,7.39847609375,1.78923Q7.496846093749999,1.8087977,7.59282609375,1.8379135Q7.688806093749999,1.867029,7.781476093749999,1.905413Q7.87413609375,1.943796,7.96259609375,1.991077Q8.05105609375,2.038359,8.13445609375,2.094083Q8.21784609375,2.149807,8.29538609375,2.213437Q8.37291609375,2.2770669999999997,8.44383609375,2.3479900000000002Q8.51476609375,2.418913,8.57839609375,2.496447Q8.642026093750001,2.57398,8.69774609375,2.657377Q8.75346609375,2.740774,8.80074609375,2.82923Q8.84803609375,2.91769,8.88641609375,3.01035Q8.92479609375,3.10302,8.95391609375,3.199Q8.98303609375,3.29498,9.00259609375,3.39336Q9.02216609375,3.49173,9.03199609375,3.59155Q9.04182609375,3.69137,9.04182609375,3.79167Z"
                          fill="#A6A6A6"
                          fill-opacity="1"
                        />
                        <path
                          d="M5.20293209375,1.994437Q4.45849609375,2.738874,4.45849609375,3.79167Q4.45849609375,4.84446,5.20293209375,5.588900000000001Q5.94736909375,6.33333,7.00016609375,6.33333Q8.05295609375,6.33333,8.79739609375,5.588900000000001Q9.54182609375,4.84446,9.54182609375,3.79167Q9.54182609375,2.738874,8.79739609375,1.994437Q8.05295609375,1.25,7.00016609375,1.25Q5.94736909375,1.25,5.20293209375,1.994437ZM5.91003909375,4.8817900000000005Q5.45849609375,4.43025,5.45849609375,3.79167Q5.45849609375,3.1530899999999997,5.91003909375,2.701544Q6.36158609375,2.25,7.00016609375,2.25Q7.63874609375,2.25,8.09028609375,2.701544Q8.54182609375,3.1530899999999997,8.54182609375,3.79167Q8.54182609375,4.43025,8.09028609375,4.8817900000000005Q7.63874609375,5.33333,7.00016609375,5.33333Q6.36158609375,5.33333,5.91003909375,4.8817900000000005Z"
                          fill-rule="evenodd"
                          fill="#A6A6A6"
                          fill-opacity="1"
                        />
                      </g>
                      <g>
                        <path
                          d="M1.75,11.8999559765625L1.75,12.2499559765625L12.25,12.2499559765625L12.25,11.8999559765625C12.25,10.5931759765625,12.25,9.9397859765625,11.9957,9.4406559765625C11.772,9.0016089765625,11.41502,8.6446389765625,10.97597,8.4209299765625C10.47684,8.1666259765625,9.82345,8.1666259765625,8.516670000000001,8.1666259765625L5.4833300000000005,8.1666259765625C4.176550000000001,8.1666259765625,3.52316,8.1666259765625,3.0240299999999998,8.4209299765625C2.584977,8.6446389765625,2.228021,9.0016089765625,2.004319,9.4406559765625C1.75,9.9397859765625,1.75,10.5931759765625,1.75,11.8999559765625Z"
                          fill="#A6A6A6"
                          fill-opacity="1"
                        />
                        <path
                          d="M2.79704,7.9754219765625Q1.976768,8.3933739765625,1.558815,9.2136559765625L1.558815,9.213665976562499Q1.339171,9.644735976562501,1.28345,10.3267159765625Q1.25,10.7361259765625,1.25,11.8999559765625L1.25,12.2499559765625Q1.25,12.2992059765625,1.259607,12.3475059765625Q1.269215,12.3958059765625,1.28806,12.4412959765625Q1.3069060000000001,12.486795976562501,1.334265,12.5277459765625Q1.361625,12.568685976562499,1.396447,12.6035159765625Q1.431269,12.6383359765625,1.472215,12.6656959765625Q1.513161,12.693055976562501,1.5586579999999999,12.7118959765625Q1.604155,12.730745976562499,1.6524549,12.740355976562501Q1.7007543,12.7499559765625,1.75,12.7499559765625L12.25,12.7499559765625Q12.2992,12.7499559765625,12.3475,12.740355976562501Q12.3958,12.730745976562499,12.4413,12.7118959765625Q12.4868,12.693055976562501,12.5278,12.6656959765625Q12.5687,12.6383359765625,12.6036,12.6035159765625Q12.6384,12.568685976562499,12.6657,12.5277459765625Q12.6931,12.486795976562501,12.7119,12.4412959765625Q12.7308,12.3958059765625,12.7404,12.3475059765625Q12.75,12.2992059765625,12.75,12.2499559765625L12.75,11.8999559765625Q12.75,10.7361259765625,12.7166,10.3267259765625Q12.6608,9.6447459765625,12.4412,9.213665976562499Q12.0232,8.3933849765625,11.20297,7.9754289765625Q10.77188,7.7557909765625,10.0899,7.7000739765625Q9.680489999999999,7.6666259765625,8.516670000000001,7.6666259765625L5.4833300000000005,7.6666259765625Q4.31951,7.6666259765625,3.9101,7.7000739765625Q3.22812,7.7557909765625,2.79704,7.9754219765625ZM2.250343,11.7499559765625Q2.258279,10.0435759765625,2.449822,9.6676459765625L2.449823,9.6676459765625Q2.720266,9.1368689765625,3.25101,8.8664389765625Q3.6431899999999997,8.6666259765625,5.4833300000000005,8.6666259765625L8.516670000000001,8.6666259765625Q10.35681,8.6666259765625,10.74897,8.8664319765625Q11.27975,9.1368799765625,11.55019,9.6676359765625Q11.74172,10.0435659765625,11.74966,11.7499559765625L2.250343,11.7499559765625Z"
                          fill-rule="evenodd"
                          fill="#A6A6A6"
                          fill-opacity="1"
                        />
                      </g>
                    </g>
                  </svg>
                  {/*<img*/}
                  {/*  src={require("@/assets/images/worktile/user.png")}*/}
                  {/*  alt=""*/}
                  {/*  style={{ marginRight: 4 }}*/}
                  {/*/>*/}
                  {quote?.dutyPersonName}
                </span>
              )}
            </Footer>
          ) : (
            <div style={{ height: 4 }}></div>
          )}
        </Content>
      </Container>
    </div>
  );
}

export default React.memo(QuoteItem);
