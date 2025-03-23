import React, { useState, useEffect } from "react";
import { useCrudContext } from "../CrudType/CrudType"; // Context에서 제공하는 훅을 가져옵니다.

const Crud: React.FC = () => {
  const { items, addItem, updateItem, deleteItem, getItems } = useCrudContext(); // 타입을 받은 useContext 사용
  const [newItem, setNewItem] = useState<{ name: string; description: string }>(
    {
      name: "",
      description: "",
    }
  );

  // 컴포넌트가 마운트될 때 아이템들을 가져옵니다.
  useEffect(() => {
    getItems(); // 초기 로딩 시 데이터 가져오기
  }, [getItems]);

  // 아이템 추가 함수
  const handleAddItem = async () => {
    if (newItem.name && newItem.description) {
      await addItem(newItem); // 아이템 추가
      setNewItem({ name: "", description: "" }); // 입력 필드 초기화
      getItems(); // Firestore에서 아이템을 다시 가져오기
    }
  };

  // 아이템 업데이트 함수
  const handleUpdateItem = async (id: string) => {
    await updateItem(id, { name: "Updated Item" }); // 예시로 이름을 업데이트
    getItems(); // 아이템 리스트 갱신
  };

  // 아이템 삭제 함수
  const handleDeleteItem = async (id: string) => {
    await deleteItem(id); // 아이템 삭제
    getItems(); // 아이템 리스트 갱신
  };

  return (
    <div>
      {/* 새로운 아이템 입력 폼 */}
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Name"
      />
      <input
        type="text"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
        placeholder="Description"
      />
      <button onClick={handleAddItem}>Add Item</button>

      {/* 아이템 리스트 보여주기 */}
      <ul>
        {items.length === 0 ? (
          <li>No items available</li>
        ) : (
          items.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button onClick={() => handleUpdateItem(item.id)}>Update</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Crud;
