import { useRef } from "react"
import {
	Dialog,
	DialogTrigger,
	ModalOverlay,
	Modal,
} from "react-aria-components"
import styles from "./styles.module.css"
import { useModalStore } from "../../stores/useModalStore"
import SearchComponent from "../SearchComponent/SearchComponent"

const SearchModal = () => {
	const { modalOptions, setModalOptions } = useModalStore()
	const overlay = useRef(null)
	const closeModal = ()=>{
		setModalOptions({
			...modalOptions,
			isOpen: false,
		})
	}
	const closeFromOverlay = (e) => {
		if (e.target === overlay.current) {
			closeModal()
		}
	}
	return (
		<DialogTrigger isOpen={modalOptions.isOpen}>
			<div onClick={closeFromOverlay}>
				<ModalOverlay ref={overlay} className={styles.modalOverlay}>
					<Modal className={styles.modal}>
						<Dialog>
							<SearchComponent/>
						</Dialog>
					</Modal>
				</ModalOverlay>
			</div>
		</DialogTrigger>
	)
}
export default SearchModal