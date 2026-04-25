export type Shot = {
  id: string;
  description: string;
  imageUrl?: string;
  notes?: string;
};

export type Scene = {
  id: string;
  heading: string;
  description?: string;
  shots: Shot[];
};

export type Project = {
  id: string;
  title: string;
  createdAt: string;
  styleNotes?: string;
  scenes: Scene[];
};
