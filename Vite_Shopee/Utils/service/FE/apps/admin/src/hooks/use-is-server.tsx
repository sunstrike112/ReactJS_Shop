function useIsServer() {
  if (typeof window === "undefined") return true
  return false
}

export default useIsServer;
