function Icon(props: any) {
  const color = props.theme === "dark" ? "#ffffff" : "#000000";
  return (
    <svg
      // fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44.343 46"
      width="100px"
      height="100px"
      {...props}
    >
      <g data-name="Слой 2">
        <g data-name="Слой 6">
          <path
            fill="none"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6.615,7.444H35.728a2,2,0,0,1,2,2V38.556a0,0,0,0,1,0,0H8.615a2,2,0,0,1-2-2V7.444a0,0,0,0,1,0,0Z"
            transform="rotate(45 22.171 23)"
          />
          <rect
            width="11.314"
            height="11.314"
            x="16.515"
            y="17.343"
            fill="none"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="2"
            transform="rotate(45 22.171 23)"
          />
          <path
            fill="none"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22.172,15a11.043,11.043,0,0,1-3-7,11.043,11.043,0,0,1,3-7"
          />
          <path
            fill="none"
            stroke={color}
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22.172,31a11.043,11.043,0,0,1,3,7,11.043,11.043,0,0,1-3,7"
          />
        </g>
      </g>
    </svg>
  );
}

export default Icon;
