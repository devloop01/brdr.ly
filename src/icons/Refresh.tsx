function Refresh({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M21 2v6h-6"></path>
      <path d="M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6"></path>
      <path d="M21 12a9 9 0 01-15 6.7L3 16"></path>
    </svg>
  )
}

export default Refresh
