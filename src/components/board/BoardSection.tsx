import { useState } from "react";
import BoardCard, { type BoardMember } from "./BoardCard";
import BoardModal from "./BoardModal";
import { API_BASE_URL } from "../../config";

const members: BoardMember[] = [
  {
    id: 1,
    name: "John Smith",
    position: "Chairman",
    image: "/Images/Board/chairman.jpg",
  },
  {
    id: 2,
    name: "Sarah Williams",
    position: "Chief Executive Officer",
    image: "/Images/Board/ceo.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Chief Financial Officer",
    image: "/Images/Board/cfo.jpg",
  },
];

interface BoardProfile {
  name: string;
  position: string;
  image: string;
  bio: string;
}

export default function BoardSection() {
  const [profile, setProfile] = useState<BoardProfile | null>(null);

  async function openProfile(id: number) {
    const member = members.find((item) => item.id === id);
    if (!member) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/board-members/${id}`);

      if (!response.ok) {
        throw new Error("Unable to load biography.");
      }

      const data = await response.json();
      setProfile({
        name: data.name ?? member.name,
        position: data.position ?? member.position,
        image: member.image,
        bio: data.biography ?? data.bio ?? "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="board-section">
      <h2>Board of Directors</h2>

      <div className="board-grid">
        {members.map((member) => (
          <BoardCard
            key={member.id}
            member={member}
            onViewProfile={openProfile}
          />
        ))}
      </div>

      {profile && (
        <BoardModal
          member={profile}
          onClose={() => setProfile(null)}
        />
      )}
    </section>
  );
}
