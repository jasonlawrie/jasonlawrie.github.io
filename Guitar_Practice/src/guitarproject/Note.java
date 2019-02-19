package guitarproject;

public class Note {

	private String name;
	private int hundredCentsFromA2;
	
	public Note() {
		name="";
		hundredCentsFromA2=0;
	}
	
	public void setName(String name) {
		this.name=name;
	}
	public String getName() {
		return name;
	}
	public void setHundredCentsFromA2(int hundredCentsFromA2) {
		this.hundredCentsFromA2=hundredCentsFromA2;
	}
	public int getHundredCentsFromA2() {
		return hundredCentsFromA2;
	}

	public boolean equals(Note otherNote) {
		if(this.hundredCentsFromA2==otherNote.hundredCentsFromA2) {
			return true;
		}
		return false;
	}
	public String toString() {
		return name;
	}
}
