package guitarproject;



public class Fret{
	
	private int fretNum;
	private String strName;
	private int strNum;
	private Note note;
	private int noteNum;

	
	
	/**
	 * @return the fretNum
	 */
	public int getFretNum() {
		return fretNum;
	}


	/**
	 * @return the strName
	 */
	public String getStrName() {
		return strName;
	}


	/**
	 * @return the strNum
	 */
	public int getStrNum() {
		return strNum;
	}



	/**
	 * @return the noteNum
	 */
	public int getNoteNum() {
		return noteNum;
	}

	public Note getNote() {
		return note;
	}


	public Fret(String strName, int strNum, int fretNum, int noteNum, Note note) {
		this.fretNum=fretNum;
		this.strName=strName;
		this.strNum=strNum;
		this.note=note;
		this.noteNum=noteNum;

	}
	
}
