package com.jasonlawrie.theory;

public class GuitarClosedTriad extends ClosedTriad {

	private Fret[] chordFret = new Fret[3];
	private GuitarString[] strings;
	private int startString;
	
	public GuitarClosedTriad(Key myKey, Note root, int inversion, GuitarString[] strings, int startString) {
		super(myKey,root,inversion);
		this.strings=strings;
		this.startString=6-startString;
		setInversion(super.getInversion());
	}
	
	public void setInversion(int inversion) {
		super.setInversion(inversion);
		setChordFret();
	}
	
	public void setRoot(Note root) {
		
	}
	public boolean setChordFret() {
		if(startString>=0&&startString<4) {
			for(int i=0;i<3;i++) {

				for(Fret fret:strings[startString+i].getFrets()){

					if(super.getNotes()[i].getHundredCentsFromA2()%12==fret.getNote().getHundredCentsFromA2()%12) {
						chordFret[i]=fret;
						break;
					}
				}
			}
			if(Math.abs(chordFret[2].getFretNum()-chordFret[0].getFretNum())>4||
			   Math.abs(chordFret[1].getFretNum()-chordFret[0].getFretNum())>4||
			   Math.abs(chordFret[2].getFretNum()-chordFret[1].getFretNum())>4){
				for(int i=0;i<3;i++) {
					for(int j=4;j<strings[startString+i].getFrets().size();j++){
						if(super.getNotes()[i].getHundredCentsFromA2()%12==strings[startString+i].getFrets().get(j).getNote().getHundredCentsFromA2()%12) {
							chordFret[i]=strings[startString+i].getFrets().get(j);
							
							break;
						}
					}
				}
			}
			if(Math.abs(chordFret[2].getFretNum()-chordFret[0].getFretNum())>4||
			   Math.abs(chordFret[1].getFretNum()-chordFret[0].getFretNum())>4||
			   Math.abs(chordFret[2].getFretNum()-chordFret[1].getFretNum())>4){
				return false;
			}
			printChordFret();
			return true;
		}
		
		return false;
	}
	public void printChordFret() {
		for(int i=0;i<3;i++) {
			System.out.println(chordFret[i].getNote()+" on string: "+chordFret[i].getStrNum()+" on fret: "+chordFret[i].getFretNum());
		}
		System.out.println();
	}
	public Fret[] getChordFret() {
		return chordFret;
	}
}
