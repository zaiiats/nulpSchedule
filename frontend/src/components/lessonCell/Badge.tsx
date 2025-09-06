import styled from "styled-components";
import { TYPE_COLORS } from "../../constants";

const StyledBadge = styled.span<{ $kind: string }>`
  ${({ $kind }) => {
    const c = TYPE_COLORS[$kind] ?? {
      bg: "rgba(148,163,184,0.12)",
      border: "rgba(148,163,184,0.35)",
      text: "var(--muted)",
    };
    return `
      background: ${c.bg};
      border: 1px solid ${c.border};
      color: ${c.text};
    `;
  }}
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 11px;
  line-height: 1.2;
  white-space: nowrap;
`;

export default function Badge({
  kind,
  children,
}: {
  kind: string;
  children: React.ReactNode;
}) {
  return <StyledBadge $kind={kind}>{children}</StyledBadge>;
}
