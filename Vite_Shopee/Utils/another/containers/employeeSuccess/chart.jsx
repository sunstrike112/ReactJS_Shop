import { convertToInputFormatEmployeeSuccess } from 'dhm/utils/helpers/convert';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_SELECTED_VALUES, keyMapping } from 'dhm/utils/constants/employeeSuccess';
import { ServiceEmployeeSuccess } from 'dhm/store/employeeSuccess/services';

// ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export function ChartEmployeeSuccess() {
  const {
    state: { detailEmployeeSuccess },
  } = ServiceEmployeeSuccess();
  const [selectedValues, setSelectedValues] = useState(DEFAULT_SELECTED_VALUES());

  const {
    jobDesptDesired,
    jobDetailsCurrentStatus,
    humanRelationsHope,
    humanRelationsCurrentSituation,
    careerPreferred,
    careerCurrent,
    moneyHope,
    moneyCurrent,
    workStyleHope,
    workStyleCurrentSituation,
  } = detailEmployeeSuccess;
  const inputObj = {
    jobDesptDesired,
    jobDetailsCurrentStatus,
    humanRelationsHope,
    humanRelationsCurrentSituation,
    careerPreferred,
    careerCurrent,
    moneyHope,
    moneyCurrent,
    workStyleHope,
    workStyleCurrentSituation,
  };
  useEffect(() => {
    const getDefaultSelectedValues = convertToInputFormatEmployeeSuccess(inputObj, keyMapping);
    setSelectedValues(getDefaultSelectedValues);
  }, [detailEmployeeSuccess]);

  const dataConvert = useMemo(() => {
    const newList = {
      render1: [],
      render2: [],
    };
    Object.keys(selectedValues).forEach((key) => {
      const value = selectedValues[key];
      newList.render1.push(+value[0]);
      newList.render2.push(+value[1]);
    });
    return newList;
  }, [selectedValues]);
  const { render1, render2 } = dataConvert;
  const data = useMemo(
    () => [
      { dataKey: '仕事内容', A: render1[0] || 0, B: render2[0] || 0, fullMark: 150 },
      { dataKey: '人間関係', A: render1[1] || 0, B: render2[1] || 0, fullMark: 150 },
      { dataKey: 'キャリア', A: render1[2] || 0, B: render2[2] || 0, fullMark: 150 },
      { dataKey: 'お金', A: render1[3] || 0, B: render2[3] || 0, fullMark: 150 },
      { dataKey: '働き方', A: render1[4] || 0, B: render2[4] || 0, fullMark: 150 },
    ],
    [dataConvert],
  );

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RadarChart data={data}>
        <PolarGrid gridType='circle' />
        <PolarAngleAxis dataKey='dataKey' fontSize='7px' fontWeight='800' />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 1, 2, 3, 4, 5]}
          type='category'
          tick={{ fill: '#000', fontSize: '7px' }}
          scale='linear'
        />
        <Radar name='希望' dataKey='A' stroke='#397FF4' fillOpacity={0} />
        <Radar name='現状' dataKey='B' stroke='#AB547F' fillOpacity={0} />
        <Legend align='left' verticalAlign='top' layout='vertical' iconSize='5px' iconType='circle' />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
