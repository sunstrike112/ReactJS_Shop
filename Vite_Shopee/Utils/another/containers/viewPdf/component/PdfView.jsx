import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { WrapperPdf } from './styled';

export function PdfView({ pdfUrl }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const min = 25;
  const max = 200;
  const [percent, setPercent] = useState(100);

  const handleZoomIn = () => {
    if (percent <= 195) {
      setPercent((pre) => pre + 5);
    } else {
      setPercent(max);
    }
  };

  const handleZoomOut = () => {
    if (percent >= 30) {
      setPercent((pre) => pre - 5);
    } else {
      setPercent(min);
    }
  };
  return (
    <WrapperPdf>
      <Flex justifyContent='center' alignItems='center' flexDirection='column'>
        <Box
          className='page-container'
          width='585px'
          height='736'
          margin='17px 0px'
          overflowY='scroll'
          boxShadow='0 25px 50px 0 rgba (62, 62, 62, 0.15)'
        >
          <Document file={pdfUrl} noData='' loading='PDFを読み込み中...'>
            <Page pageNumber={1} scale={percent * 0.01} />
          </Document>
        </Box>
        <Flex width='100%' height='24px' justifyContent='end' alignItems='center' bg='#646464' color='white'>
          {percent}%
          <MinusIcon onClick={handleZoomOut} ml={2} mr={3} w={2} h={2} cursor='pointer'>
            -
          </MinusIcon>
          <Slider
            width='100px'
            aria-label='slider-ex-4'
            value={percent}
            min={min}
            max={max}
            onChange={(val) => setPercent(val)}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <AddIcon onClick={handleZoomIn} mx={3} w={2} h={2} cursor='pointer'>
            +
          </AddIcon>
        </Flex>
      </Flex>
    </WrapperPdf>
  );
}
