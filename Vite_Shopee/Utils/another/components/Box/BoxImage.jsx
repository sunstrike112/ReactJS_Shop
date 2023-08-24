import { Image, Box, CircularProgress } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

export function LazyLoadBlurImage({ src, width, height, borderRadius }) {
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = src;
            img.onload = () => {
              img.style.filter = 'blur(0)'; // Remove the blur effect once the image loads
              setIsLoading(false); // Update the loading state
            };
            img.onerror = () => {
              setIsLoading(false); // Update the loading state
              setIsError(true); // Set the error state
            };
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  return (
    <Box position='relative' width={width} height={height} borderRadius={borderRadius}>
      {isLoading && !isError && (
        <Box
          position='absolute'
          top='0'
          left='0'
          width='100%'
          height='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress isIndeterminate color='gray' size='40px' />
        </Box>
      )}
      {isError && (
        <Box
          width='100px'
          height='100px'
          borderRadius='50%'
          border='1px solid'
          borderColor='gray.300'
          display='flex'
          justifyContent='center'
          alignItems='center'
          fontSize='15px'
          fontWeight='semibold'
        >
          No Image
        </Box>
      )}

      <Image
        ref={imageRef}
        // opacity={isError ? 0 : 1}
        objectFit='cover'
        width='100%'
        height='100%'
        borderRadius={borderRadius}
        src='' // Empty source initially
        style={{ filter: 'blur(10px)' }} // Apply the initial blur effect
        loading='lazy'
        // onLoad={() => setIsLoading(false)} // Update the loading state when the image loads
      />
    </Box>
  );
}
