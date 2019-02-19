package guitarproject;

import java.util.ArrayList;
import java.util.List;

public class GuitarString {

	private String strName;
	private int strNum;
	private int hundredCentsFromA2;
	private int fretCount;
	private Note[] notesInKey;
	private List<Fret> fret = new ArrayList<Fret>();
	
	public GuitarString(String strName, int strNum, int hundredCentsFromA2, int fretCount, Key myKey) {
		this.strName=strName;
		this.strNum=strNum;
		this.hundredCentsFromA2=hundredCentsFromA2;
		this.fretCount=fretCount;
		notesInKey = myKey.getNotes();
		setFretPitch();
	}

	public void setFretPitch(){
		
		for(int i=0;i<fretCount;i++) {
			for(int j=0;j<notesInKey.length;j++) {
				if((this.getHundredCentsFromA2()+120+i)%12==(notesInKey[j].getHundredCentsFromA2()+120)%12) {
					fret.add(new Fret(this.getStrName(), this.getStrNum(), i,j,notesInKey[j]));
				}
			}
		}
	}
		
	public void printFrets(){
		for(Fret eachFret:fret) {
			System.out.println("String: "+eachFret.getStrNum()+" Fret: "+eachFret.getFretNum()+ " Note Number: "+ ((int)eachFret.getNoteNum()+1)+" Note: "+eachFret.getNote().getName()+" Pitch: "+eachFret.getNote().getHundredCentsFromA2());
		}
	}
	
	public List<Fret> getFrets(){
		return fret;
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
	 * @return the halfStepsFromE
	 */
	public int getHundredCentsFromA2() {
		return hundredCentsFromA2;
	}

}
