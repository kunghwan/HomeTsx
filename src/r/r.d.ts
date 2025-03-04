interface Requirement {
  id: string;
  status: RequirementStatus | "";
  title: string;
  descs: string[];
  manager: RequirementManager | "";
}

type RequirementStatus = "계획중" | "진행중" | "완료";
type RequirementManager = "유경환" | "허승이" | "김영화" | "강산" | "강찬희";
