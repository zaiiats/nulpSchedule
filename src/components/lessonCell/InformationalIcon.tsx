import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function InformationalIcon() {
  return (
    <StyledWrapper>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2.25"
        />
        <circle cx="12" cy="7.25" r="1.4" fill="currentColor" />
        <rect
          x="10.9"
          y="10"
          width="2.2"
          height="8"
          rx="1.1"
          fill="currentColor"
        />
      </svg>
    </StyledWrapper>
  );
}
