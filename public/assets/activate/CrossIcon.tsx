function Icon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width="100px"
      height="100px"
      {...props}
    >
      <path
        fill="#f78f8f"
        d="M40,77.5C19.322,77.5,2.5,60.678,2.5,40S19.322,2.5,40,2.5S77.5,19.322,77.5,40S60.678,77.5,40,77.5 z"
      />
      <path
        fill="#c74343"
        d="M40,3c20.402,0,37,16.598,37,37S60.402,77,40,77S3,60.402,3,40S19.598,3,40,3 M40,2 C19.013,2,2,19.013,2,40s17.013,38,38,38s38-17.013,38-38S60.987,2,40,2L40,2z"
      />
      <path
        fill="#fff"
        d="M37 20H43V60H37z"
        transform="rotate(-134.999 40 40)"
      />
      <path
        fill="#fff"
        d="M37 20H43V60H37z"
        transform="rotate(-45.001 40 40)"
      />
    </svg>
  );
}

export default Icon;
