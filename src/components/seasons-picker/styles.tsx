import styled from "styled-components";

export const Picker = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--divider);
  border-radius: 999px;
  background-color: var(--accent-soft);
`;

export const PickerButton = styled.button`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 16px;
  line-height: 0;
  cursor: pointer;
  transition:
    transform var(--dur-micro) var(--ease-out),
    background-color var(--dur-micro) var(--ease-out),
    color var(--dur-micro) var(--ease-out);

  :hover:not([aria-pressed="true"]) {
    color: var(--accent-ink);
  }

  :active {
    transform: scale(0.98);
  }

  &[aria-pressed="true"] {
    background-color: var(--surface);
    color: var(--accent-ink);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
