import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp,getDocs, query, where,updateDoc,deleteDoc } from "firebase/firestore";
const addProject = async (userID, projectName, content) => {
  let projectId="";
  try {
    // Tạo projectId ngẫu nhiên
    do{

      projectId = uuidv4();
  
      // Kiểm tra xem projectId có bị trùng hay không
      const q = query(collection(db, "Projects"), where("projectId", "==", projectId));
      var querySnapshot = await getDocs(q);
    }while(!querySnapshot.empty);

    // Thêm project mới nếu projectId là duy nhất
    await addDoc(collection(db, "Projects"), {
      projectId: projectId,
      name: projectName,
      content: content,
      userID: userID,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};
const GetAllProjects = async (userID) => {
  try {
    const q = query(collection(db, "Projects"), where("userID", "==", userID));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Get Projects successfully!", projects);
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
  }
};
const GetProjectById = async (projectId) => {
  try {
    const q = query(collection(db, "Projects"), where("projectId", "==", projectId));
    const querySnapshot = await getDocs(q);
    const project = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Get project successfully!", project);
    return project;
  } catch (error) {
    console.error("Error getting project:", error);
  }
};

const updateProject = async (projectId, updatedData) => {
  try {
    const projectRef = doc(db, "Projects", projectId);
    await updateDoc(projectRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    console.log("Project updated successfully!");
  } catch (error) {
    console.error("Error updating project:", error);
  }
};
const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "Projects", projectId));
    console.log("Project deleted successfully!");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
export {addProject, GetAllProjects, deleteProject, GetProjectById,updateProject};